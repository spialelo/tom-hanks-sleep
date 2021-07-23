import { render, screen, cleanup, fireEvent, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SleepScore from '../components/SleepScore';


 describe('Test SleepScore component', () => {
   
   describe('SleepScore header', () => {
       
        beforeEach(() => {
        });
        
        afterEach(() => {
            cleanup();
        });

      test('Renders Sleep Score header', () => {
          const { getByText, getByTestId } = render(<SleepScore />);
          const linkElement = getByText(/Sleep Score/i);
          expect(linkElement).toBeInTheDocument();
        });
        
    });
    
    
    
    describe('Test Button state', () => {
        
        beforeEach(() => {
        });
        
        afterEach(() => {
            cleanup();
        });
        

      test('Renders button', () => {
          const { getByText, getByTestId } = render(<SleepScore />);
          const buttonElement = getByTestId("calculate");
          expect(buttonElement).toBeInTheDocument();
          expect(buttonElement).toBeTruthy();
        });
        
        test('Button in disabled state', () => {
          const { getByText, getByTestId } = render(<SleepScore />);
          const buttonElement = getByTestId("calculate");
          expect(buttonElement).not.toBeEnabled();
        });
        
    });
    
    
    
    describe('Test Drop down states', () => {
        
        beforeEach(() => {
            });
        
        afterEach(() => {
            cleanup();
        });

      test('Renders durationInBed drop down', () => {
          const { getByText, getByTestId } = render(<SleepScore />);
          const dropdownElement = getByTestId("duration-bed");
          expect(dropdownElement).toBeInTheDocument();
        });
        
        
        test('Renders durationAsleep drop down', () => {
          const { getByText, getByTestId } = render(<SleepScore />);
          const dropdownElement = getByTestId("duration-asleep");
          expect(dropdownElement).toBeInTheDocument();

        });
        
        
        test('Renders durationInBed drop down & change value', () => {
          const { getByText, getByTestId, getByDisplayValue } = render(<SleepScore />);
          const dropdownElement = getByTestId("duration-bed");
          
          fireEvent.change(dropdownElement, {
                target: { value: "210" }
             });
            
            expect(dropdownElement.value).toBe("210");

        });
        
        test('Renders durationAsleep drop down & change value', () => {
          const { getByText, getByTestId, getByDisplayValue } = render(<SleepScore />);
          const dropdownElement = getByTestId("duration-asleep");
          
          fireEvent.change(dropdownElement, {
                target: { value: "150" }
             });
            
            expect(dropdownElement.value).toBe("150");

        });
        
        
    });
    
    
    describe('Text score calculation and display state', () => {
        
        beforeEach(() => {
            });
        
        afterEach(() => {
            cleanup();
        });

      test('Renders empty display', () => {
          const { getByText, getByTestId } = render(<SleepScore />);
          const divElement = getByTestId("text-display");
          expect(divElement.firstChild).not.toBeInTheDocument();
        });
        
        
        test('Make one dropdown selection, check button is still disabled', () => {
          const { getByTestId } = render(<SleepScore />);
          const divElement = getByTestId("text-display");
          const dropdown1 = getByTestId("duration-bed");

          const buttonElement = getByTestId("calculate");

          
          expect(buttonElement).not.toBeEnabled();
          
          fireEvent.change(dropdown1, {
                target: { value: "210" }
             });
          expect(buttonElement).not.toBeEnabled();
          expect(divElement.firstChild).not.toBeInTheDocument();
          
        });
        
        
        test('Make both dropdown selections, check button is enabled, click button, Loading is shown, and then the score is shown', async () => {
          const { getByTestId } = render(<SleepScore />);
          const divElement = getByTestId("text-display");
          const dropdown1 = getByTestId("duration-bed");
          const dropdown2 = getByTestId("duration-asleep");
          const buttonElement = getByTestId("calculate");
          
          expect(buttonElement).not.toBeEnabled();
          
          fireEvent.change(dropdown1, {
                target: { value: "210" }
             });
          fireEvent.change(dropdown2, {
                target: { value: "150" }
             });
          
          expect(buttonElement).toBeEnabled();
          expect(divElement.firstChild).not.toBeInTheDocument();
          
          
           const leftClick = { button: 0 };
           userEvent.click(buttonElement, leftClick);
           
           const { getByText } = within(divElement);
           expect(getByText('Loading...')).toBeInTheDocument();

           await waitFor(() =>
            expect(getByText('Your sleep score is: 71')).toBeInTheDocument(), {timeout: 4000}  // default is 1000ms
           );
 
        });
        
        
    });
    
 });
 
 
 
 

