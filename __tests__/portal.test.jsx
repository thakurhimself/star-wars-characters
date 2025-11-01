// import '@testing-library/jest-dom'
// import { render, screen } from '@testing-library/react'
 
// describe('Page', () => {
//   it('renders a heading', () => {
//     expect(2+2).toBe(4)
//   })
// })


import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portal from '../components/Portal';
import CharacterDetails from '../components/CharacterDetails';
// import { CharacterType } from '@/types/types';

describe('Portal with CharacterDetails Integration', () => {
  const mockCharacter = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/'
    ],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/'
  };

  const mockHomeWorldDetails = {
    name: 'Tatooine',
    terrain: 'desert',
    climate: 'arid',
    population: '200000'
  };

  beforeEach(() => {
    // Create a portal root if needed
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('opens portal with character details and displays all information correctly', () => {
    const mockOnClose = jest.fn();

    render(
      <Portal onClosePortal={mockOnClose}>
        <CharacterDetails 
          character={mockCharacter} 
          homeWorldDetails={mockHomeWorldDetails} 
        />
      </Portal>
    );

    // Verify portal overlay is rendered
    const overlay = document.body.querySelector('.fixed.z-\\[3500\\]');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('bg-[rgba(0,0,0,0.8)]');

    // Verify modal container exists with correct styling
    const modal = document.body.querySelector('.bg-white.p-3.rounded-lg');
    expect(modal).toBeInTheDocument();

    // Verify character name is displayed as heading
    expect(screen.getByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument();

    // Verify character details are displayed correctly
    expect(screen.getByText('Height (meter)')).toBeInTheDocument();
    expect(screen.getByText('1.72')).toBeInTheDocument();

    expect(screen.getByText('Mass (Kg)')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();

    expect(screen.getByText('Date Added')).toBeInTheDocument();
    expect(screen.getByText('9-11-2014')).toBeInTheDocument();

    expect(screen.getByText('Number of films the person appears in')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    expect(screen.getByText('Birth Year')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();

    // Verify home world section exists
    expect(screen.getByText('Home World Details')).toBeInTheDocument();

    // Verify home world details
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('desert')).toBeInTheDocument();
    expect(screen.getByText('arid')).toBeInTheDocument();
    expect(screen.getByText('200000')).toBeInTheDocument();

    // Verify close button exists
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  it('closes portal when close button is clicked', () => {
    const mockOnClose = jest.fn();

    render(
      <Portal onClosePortal={mockOnClose}>
        <CharacterDetails 
          character={mockCharacter} 
          homeWorldDetails={mockHomeWorldDetails} 
        />
      </Portal>
    );

    // Verify character details are visible
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    // Click close button
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    // Verify onClose callback was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays different character details when character prop changes', () => {
    const mockOnClose = jest.fn();
    
    const darthVader = {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/'
      ],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:18:20.704000Z',
      edited: '2014-12-20T21:17:50.313000Z',
      url: 'https://swapi.dev/api/people/4/'
    };

    const { rerender } = render(
      <Portal onClosePortal={mockOnClose}>
        <CharacterDetails 
          character={mockCharacter} 
          homeWorldDetails={mockHomeWorldDetails} 
        />
      </Portal>
    );

    // Verify Luke's details
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('1.72')).toBeInTheDocument();

    // Rerender with Darth Vader
    rerender(
      <Portal onClosePortal={mockOnClose}>
        <CharacterDetails 
          character={darthVader} 
          homeWorldDetails={mockHomeWorldDetails} 
        />
      </Portal>
    );

    // Verify Darth Vader's details
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('2.02')).toBeInTheDocument();
    expect(screen.getByText('136')).toBeInTheDocument();
    expect(screen.getByText('41.9BBY')).toBeInTheDocument();
  });

  it('renders all character detail sections within the portal modal', () => {
    const mockOnClose = jest.fn();

    render(
      <Portal onClosePortal={mockOnClose}>
        <CharacterDetails 
          character={mockCharacter} 
          homeWorldDetails={mockHomeWorldDetails} 
        />
      </Portal>
    );

    // Get the modal container
    const modal = document.body.querySelector('.bg-white.p-3.rounded-lg');
    expect(modal).toBeInTheDocument();

    // Verify all detail sections are within the modal
    const detailSections = modal?.querySelectorAll('.bg-slate-200');
    expect(detailSections?.length).toBe(8); // 5 character details + 3 homeworld details (note: name appears in homeworld section)
  });

  it('maintains portal z-index layering with character details', () => {
    const mockOnClose = jest.fn();

    render(
      <Portal onClosePortal={mockOnClose}>
        <CharacterDetails 
          character={mockCharacter} 
          homeWorldDetails={mockHomeWorldDetails} 
        />
      </Portal>
    );

    const overlay = document.body.querySelector('.fixed.z-\\[3500\\]');
    expect(overlay).toHaveClass('z-[3500]');
    
    // Verify character details are rendered inside the high z-index portal
    const characterName = screen.getByText('Luke Skywalker');
    expect(overlay?.contains(characterName)).toBe(true);
  });

  it('handles homeworld details with arrays (terrain/climate with multiple values)', () => {
    const mockOnClose = jest.fn();
    
    const homeWorldWithArrays = {
      name: 'Naboo',
      terrain: ['grassy hills', 'swamps', 'forests'],
      climate: ['temperate', 'tropical'],
      population: '4500000000'
    };

    render(
      <Portal onClosePortal={mockOnClose}>
        <CharacterDetails 
          character={mockCharacter} 
          homeWorldDetails={homeWorldWithArrays} 
        />
      </Portal>
    );

    expect(screen.getByText('Naboo')).toBeInTheDocument();
    expect(screen.getByText('4500000000')).toBeInTheDocument();
  });

  it('portal backdrop and modal have correct responsive widths', () => {
    const mockOnClose = jest.fn();

    render(
      <Portal onClosePortal={mockOnClose}>
        <CharacterDetails 
          character={mockCharacter} 
          homeWorldDetails={mockHomeWorldDetails} 
        />
      </Portal>
    );

    const modalContainer = document.body.querySelector('.bg-white.p-3.rounded-lg')?.parentElement;
    
    // Check responsive width classes
    expect(modalContainer).toHaveClass('w-[95%]');
    expect(modalContainer).toHaveClass('md:w-3/4');
    expect(modalContainer).toHaveClass('lg:w-1/2');
    expect(modalContainer).toHaveClass('xl:w-1/3');
  });
})