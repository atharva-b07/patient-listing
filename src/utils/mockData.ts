
import { Patient } from '../types/Patient';

/**
 * Generates mock patient data for testing and development purposes
 * Creates realistic patient records with diverse demographics and medical information
 */
export const generateMockPatients = (count: number): Patient[] => {
  const firstNames = [
    'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica',
    'William', 'Ashley', 'James', 'Amanda', 'Christopher', 'Stephanie', 'Daniel',
    'Melissa', 'Matthew', 'Nicole', 'Anthony', 'Elizabeth', 'Mark', 'Helen',
    'Donald', 'Deborah', 'Steven', 'Rachel', 'Paul', 'Carolyn', 'Andrew', 'Janet'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
  ];

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
    'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Detroit'
  ];

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const insuranceProviders = [
    'Aetna', 'Anthem', 'Blue Cross Blue Shield', 'Cigna', 'Humana',
    'Kaiser Permanente', 'Medicaid', 'Medicare', 'UnitedHealth', 'Other'
  ];

  const bloodTypes: ('A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-')[] = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];

  const genders: ('Male' | 'Female' | 'Other')[] = ['Male', 'Female', 'Other'];

  const physicians = [
    'Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Jones',
    'Dr. Garcia', 'Dr. Miller', 'Dr. Davis', 'Dr. Rodriguez', 'Dr. Martinez'
  ];

  const medicalConditions = [
    'Hypertension', 'Diabetes Type 2', 'Asthma', 'High Cholesterol',
    'Arthritis', 'Depression', 'Anxiety', 'COPD', 'Heart Disease', 'None'
  ];

  const commonAllergies = [
    'None', 'Penicillin', 'Shellfish', 'Peanuts', 'Latex', 'Pollen',
    'Dust Mites', 'Pet Dander', 'Bee Stings', 'Eggs', 'Milk'
  ];

  const medications = [
    'None', 'Lisinopril', 'Metformin', 'Albuterol', 'Atorvastatin',
    'Ibuprofen', 'Aspirin', 'Omeprazole', 'Sertraline', 'Levothyroxine'
  ];

  const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getRandomDate = (start: Date, end: Date): string => {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime).toISOString().split('T')[0];
  };

  const generatePhoneNumber = (): string => {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const prefix = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `(${areaCode}) ${prefix}-${number}`;
  };

  const generateEmail = (firstName: string, lastName: string): string => {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com'];
    const domain = getRandomElement(domains);
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  };

  const generateZipCode = (): string => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const generateInsuranceId = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let result = '';
    
    // Generate 2 letters
    for (let i = 0; i < 2; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    // Generate 8 numbers
    for (let i = 0; i < 8; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return result;
  };

  const patients: Patient[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const dateOfBirth = getRandomDate(new Date(1930, 0, 1), new Date(2010, 11, 31));
    const createdAt = new Date().toISOString();
    
    const patient: Patient = {
      id: (i + 1).toString(),
      firstName,
      lastName,
      dateOfBirth,
      gender: getRandomElement(genders),
      phoneNumber: generatePhoneNumber(),
      email: generateEmail(firstName, lastName),
      address: `${Math.floor(Math.random() * 9999) + 1} ${getRandomElement(['Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm', 'Washington', 'Park', 'Lincoln', 'Roosevelt'])} ${getRandomElement(['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd'])}`,
      city: getRandomElement(cities),
      state: getRandomElement(states),
      zipCode: generateZipCode(),
      insuranceProvider: getRandomElement(insuranceProviders),
      insuranceId: generateInsuranceId(),
      emergencyContactName: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
      emergencyContactPhone: generatePhoneNumber(),
      primaryPhysician: getRandomElement(physicians),
      medicalHistory: getRandomElement(medicalConditions),
      allergies: getRandomElement(commonAllergies),
      medications: getRandomElement(medications),
      bloodType: getRandomElement(bloodTypes),
      createdAt,
      updatedAt: createdAt,
    };

    patients.push(patient);
  }

  return patients;
};

/**
 * Generates a single mock patient for testing purposes
 */
export const generateSingleMockPatient = (): Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> => {
  const mockPatients = generateMockPatients(1);
  const patient = mockPatients[0];
  
  return {
    firstName: patient.firstName,
    lastName: patient.lastName,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    phoneNumber: patient.phoneNumber,
    email: patient.email,
    address: patient.address,
    city: patient.city,
    state: patient.state,
    zipCode: patient.zipCode,
    insuranceProvider: patient.insuranceProvider,
    insuranceId: patient.insuranceId,
    emergencyContactName: patient.emergencyContactName,
    emergencyContactPhone: patient.emergencyContactPhone,
    primaryPhysician: patient.primaryPhysician,
    medicalHistory: patient.medicalHistory,
    allergies: patient.allergies,
    medications: patient.medications,
    bloodType: patient.bloodType,
  };
};
