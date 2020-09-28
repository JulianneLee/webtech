export class User {
  userID: number;
  username: string;
  password: string;
  name: string;
  position: string;
  centerID: string;
}

export class TestCase {
  testID: string;
  patientID: string;
  type: string;
  symptom: string;
  officerID: string;
  testCreated: string;
  status: string;
}

export class TestCenter {
  centerID: string;
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
  testID: string;
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
