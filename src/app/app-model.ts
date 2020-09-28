export class User {
  userID: number;
  username: string;
  password: string;
  name: string;
  position: string;
  centerID: string;
}

export interface TestCase {
  testID: string;
  patientID: string;
  type: string;
  symptom: string;
  officerID: string;
  testCreated: string;
  status: string;
}

export interface TestCenter {
  centerID: string;
  name: string;
}

export interface PatientTest {
  testID: string;
  name: string;
  type: string;
  symptom: string;
  testCreated: string;
  status: string;
}
