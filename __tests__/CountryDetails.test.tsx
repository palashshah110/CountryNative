import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react-native';
import CountryDetails from '../src/screens/CountryDetails';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
const route = {
  params: {
    state:{
        capital:"delhi", 
        population:'10', 
        latlng:[1,2], 
        flags:{png:'url'}    
    },
    },
  }

const mockNavigation = {
  goBack: jest.fn(),
};

describe('CountryDetails Checking', () => {
  test('Checking Text Detalis', async() => {
    render(<CountryDetails navigation={mockNavigation} route={route} />);

    const GobackBtn = screen.getByText('Go Back');
    expect(GobackBtn).toBeDefined();

    const name = screen.getByText(`Captial: delhi`);
    expect(name).toBeDefined();

    const goBackTest = screen.getByTestId('goBackTest');
    fireEvent.press(goBackTest);
    expect(mockNavigation.goBack).toHaveBeenCalled();

    
    fetchMock.mockResponseOnce(
        JSON.stringify({
          main: {
            temp: 20,
          },
          wind: {
            speed: 20,
          },
        })
      );

    const checkweather = screen.getByText('check weather');
    fireEvent.press(checkweather);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather?lat=1&lon=2&appid=a80e7dc04639cfc4193d55970d07c503');
    
    await waitFor(()=>{
        expect(screen.getByText("Speed: 20")).toBeDefined();
        expect(screen.getByText("Temperature: 20")).toBeDefined();
    })
  
    const CloseCapitalWeatherButton = screen.getByText("Hide Modal");
    fireEvent.press(CloseCapitalWeatherButton);
  });
  test("Checking Api for Capital Weather button - error case", async () => {
    fetchMock.mockRejectOnce(new Error("API is down"));

    render(<CountryDetails navigation={mockNavigation} route={route} />);

    const checkweather = screen.getByText('check weather');
    fireEvent.press(checkweather);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.openweathermap.org/data/2.5/weather?lat=1&lon=2&appid=a80e7dc04639cfc4193d55970d07c503"
      );
    });
  });  
});
