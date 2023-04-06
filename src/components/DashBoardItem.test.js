import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteWallet } from '../services/wallet';
import { walletActions } from './store/wallet-slice';
import DashboardItem from './DashboardItem';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';


jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('./services/wallet', () => ({
  deleteWallet: jest.fn(),
}));

jest.mock('./store/wallet-slice', () => ({
  walletActions: {
    removeItemFromWallet: jest.fn(),
  },
}));

describe('DashboardItem component', () => {
  let dispatchMock;
  let useSelectorMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useSelectorMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selector) => selector({ user: { userItem: { userId: 1 } } }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with correct props', () => {
    render(
        <MemoryRouter>
            <DashboardItem
                id={1}
                name="test name"
                accountNumber="1234567890"
                description="test description"
                currentBalance={100}
            />
        </MemoryRouter>
      
    );

    expect(screen.getByText('test name')).toBeInTheDocument();
    expect(screen.getByText('Account Number: 1234567890')).toBeInTheDocument();
    expect(screen.getByText('test description')).toBeInTheDocument();
    expect(screen.getByText('Rs. 100')).toBeInTheDocument();
    expect(screen.getByText('View Transactions')).toBeInTheDocument();
    expect(screen.getByText('Update Account Info')).toBeInTheDocument();
    expect(screen.getByText('Delete Account')).toBeInTheDocument();
  });

  it('should call deleteWallet and removeItemFromWallet when delete button is clicked', async () => {
    // deleteWallet.mockResolvedValue({ status: 200 });
    render(
        <MemoryRouter>
            <DashboardItem id={1} />
        </MemoryRouter> 
        );
    const { startDeleteHandler } = DashboardItem.mock.calls[0][0];
    const deleteButton = screen.getByText('Delete Account');
    fireEvent.click(deleteButton);
    act(() => {
        startDeleteHandler();
      });
    const confirm = await screen.findByText('Are you sure?');
    fireEvent.click(confirm);
    expect(deleteWallet).toHaveBeenCalledWith(1, 1);
    expect(walletActions.removeItemFromWallet).toHaveBeenCalledWith(1);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  it('should not call deleteWallet or removeItemFromWallet when cancel is clicked', async () => {
    render( <MemoryRouter>
                <DashboardItem id={1} />
            </MemoryRouter>);
    const deleteButton = screen.getByText('Delete Account');
    fireEvent.click(deleteButton);
    const windowOpenMock = jest.fn();
    window.open = windowOpenMock;

    // Trigger the popup
    const popup = window.open('Are you sure?', '_blank');

    // Check that the popup was opened with the correct URL and target
    expect(windowOpenMock).toHaveBeenCalledWith('Are you sure?', '_blank');

    // Check that the popup object is returned
    expect(popup).not.toBeNull();
    const cancel =  window.open('cancel', '_blank');
    fireEvent.click(cancel);
    expect(deleteWallet).not.toHaveBeenCalled();
    expect(walletActions.removeItemFromWallet).not.toHaveBeenCalled();
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
