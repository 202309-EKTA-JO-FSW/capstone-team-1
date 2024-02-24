const express = require('express');
const router = express.Router();
const {getAdminRestaurant,updateAdminRestaurant}=require('../controllers/adminController');
const Restaurant=require('../models/restaurantModel');

jest.mock('../models/restaurantModel', () => ({
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));
describe('getAdminRestaurant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return the correct restaurant for the given userId', async () => {
    const userId = 'adminUserId';
    const mockRestaurant = { name: 'Mock Restaurant', owner: userId };
    Restaurant.findOne.mockResolvedValue(mockRestaurant);

    const req = { userId };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAdminRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ restaurant: mockRestaurant });
  });

  test('should return 404 if restaurant not found', async () => {
    Restaurant.findOne.mockResolvedValue(null);
    const req = { userId: 'adminUserId' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAdminRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Restaurant not found' });
  });

  test('should return 500 if an error occurs', async () => {
    Restaurant.findOne.mockRejectedValue(new Error('Database error'));
    const req = { userId: 'adminUserId' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAdminRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
 describe('updateAdminRestaurant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should update restaurant details', async () => {
    // Mock the findByIdAndUpdate function to return an updated restaurant
    const mockRestaurant = { name: 'Updated Restaurant' };
    Restaurant.findByIdAndUpdate.mockResolvedValue(mockRestaurant);

    const req = {
      params: { resId: 'restaurantId' },
      body: { name: 'Updated Restaurant' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateAdminRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ restaurant: mockRestaurant });
  });

  test('should return 404 if restaurant not found', async () => {
    // Mock the findByIdAndUpdate function to return null (restaurant not found)
    Restaurant.findByIdAndUpdate.mockResolvedValue(null);

    const req = {
      params: { resId: 'restaurantId' },
      body: { name: 'Updated Restaurant' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateAdminRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Restaurant not found' });
  });

  test('should return 500 if an error occurs', async () => {
    // Mock the findByIdAndUpdate function to throw an error
    Restaurant.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

    const req = {
      params: { resId: 'restaurantId' },
      body: { name: 'Updated Restaurant' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateAdminRestaurant(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});