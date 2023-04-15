const axios = require('axios');
const scheduleNotifications = require('../services/notifications');

// Mock axios.get
jest.mock('axios');
axios.get.mockResolvedValue({
  data: [
    { content: 'Task 1', deadline: '2023-04-20' },
    { content: 'Task 2', deadline: '2023-04-20' }
  ]
});

describe('schedule notifications', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
    scheduleNotifications()
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should send notifications every 5 minutes', async () => {
    const consoleSpy = jest.spyOn(global.console, 'log');

    jest.advanceTimersByTime(5 * 60 * 1000);
    setImmediate(async () => {
        expect(axios.get).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("Notification sent for the following task: Task 1 | deadline 2023-04-20");
        expect(consoleSpy).toHaveBeenCalledWith("Notification sent for the following task: Task 2 | deadline 2023-04-20");
        expect(consoleSpy).toHaveBeenCalledWith('------------------------------------------');
        jest.clearAllMocks();
      });
  });
});
