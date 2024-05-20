import React from "react";
import {act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import fetchMock from "jest-fetch-mock";
import CountryForm from "../src/screens/CountryForm";
import { Alert } from "react-native";
fetchMock.enableMocks();

const mockNavigation = {
  navigate: jest.fn(),
};

const mockResponse = (data: any) => ({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(data),
    headers: new Headers(),
    statusText: 'OK',
    type: 'basic',
    url: '',
    redirected: false,
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
  } as any);     
  
describe("Country Form Component", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        jest.clearAllMocks();
      });
    test("Checking and test Country Api - Success", async () => {
        jest.spyOn(Alert, 'alert');
        const mockState = [{ status: "officially-assigned", capital: ["Delhi"] }];
      render(<CountryForm navigation={mockNavigation}/>);
  
    //   fetchMock.mockResolvedValue({ok: true,status: 200,json: jest.fn().mockResolvedValue(mockState)});
      fetchMock.mockResolvedValue(mockResponse(mockState));
  
      const CountryInput = screen.getByPlaceholderText("Enter Country Name");
      const SearchButton = screen.getByText("Search");
      fireEvent.changeText(CountryInput, "india");
      expect(CountryInput.props.value).toBe('india');
      fireEvent.press(SearchButton);
  
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith(
          "https://restcountries.com/v3.1/name/india?fullText=true"
        );
        expect(mockNavigation.navigate).toHaveBeenCalledWith('CountryDetails', {
          state: mockState[0],
        });
      });
    });
  
    test("Checking and test Country Api - Not Found", async () => {
        jest.spyOn(Alert, 'alert');

        render(<CountryForm navigation={mockNavigation}/>);
        
        fetchMock.mockResponseOnce(JSON.stringify({}), {status: 404});
  
      const CountryInput = screen.getByPlaceholderText("Enter Country Name");
      const SearchButton = screen.getByText("Search");
      fireEvent.changeText(CountryInput, "unknowncountry");
      expect(CountryInput.props.value).toBe('unknowncountry');
      fireEvent.press(SearchButton);
  
      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith(
          "https://restcountries.com/v3.1/name/unknowncountry?fullText=true"
        );
        expect(Alert.alert).toHaveBeenCalledWith("API Error");
        expect(mockNavigation.navigate).not.toHaveBeenCalled();
      });
    });

    test("Checking and test Country Api - Not Found (Invalid Status)", async () => {
        jest.spyOn(Alert, 'alert');
        render(<CountryForm navigation={mockNavigation}/>);
        const mockState = [{ status: "unofficial", capital: ["FakeCity"] }];
        fetchMock.mockResolvedValue(mockResponse(mockState));        
        const CountryInput = screen.getByPlaceholderText("Enter Country Name");
        const SearchButton = screen.getByText("Search");
        fireEvent.changeText(CountryInput, "fakecountry");
        expect(CountryInput.props.value).toBe('fakecountry');
        fireEvent.press(SearchButton);
    
        await waitFor(() => {
          expect(fetchMock).toHaveBeenCalledWith(
            "https://restcountries.com/v3.1/name/fakecountry?fullText=true"
          );
          expect(Alert.alert).toHaveBeenCalledWith("API Error");
          expect(mockNavigation.navigate).not.toHaveBeenCalled();
        });
      });
      test('Checking id Validation', async () => {
        render(<CountryForm navigation={mockNavigation} />);
        const CountryInput = screen.getByPlaceholderText("Enter Country Name");
        fireEvent.changeText(CountryInput, "india9");
        expect(CountryInput.props.value).toBe('');
      });
  });
  