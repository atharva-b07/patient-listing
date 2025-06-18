
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  insuranceProvider: string;
  insuranceId: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  primaryPhysician: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  createdAt: string;
  updatedAt: string;
}

export interface PatientFilters {
  search: string;
  gender: string;
  state: string;
  insuranceProvider: string;
  bloodType: string;
  ageRange: [number, number];
}
