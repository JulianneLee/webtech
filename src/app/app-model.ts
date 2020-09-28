export class User {
  userID: number;
  username: string;
  password: string;
  name: string;
  position: string;
  centerID: number;
}

export interface TestCase {
  testID: number;
  patientID: number;
  type: string;
  symptom: string;
  officerID: number;
  testCreated: string;
  status: string;
  result: string;
  resultCreated: string;
}

export interface TestCenter {
  centerID: number;
  name: string;
}

export class TestKit {
  kitID: number;
  name: string;
  stock: number;
  status: string;
  centerID: number;
}

export interface PatientTest {
  testID: number;
  name: string;
  type: string;
  symptom: string;
  testCreated: string;
  status: string;
}

export interface TestKitViewModel {
  kitID: number;
  name: string;
  stock: number;
  centerName: string;
}
