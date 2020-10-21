export class User {
  userID: number;
  username: string;
  password: string;
  name: string;
  position: string;
  centerID: string;
}

export class TestCase {
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

export class TestCenter {
  centerID: number;
  name: string;
  managerID: number;
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

export interface GenerateReport {
  centerID: number;
  centerName: string;
  managerName: string;
  testCases: TestCaseViewModel[];
}

export interface TestCaseViewModel {
  testID: number;
  patientName: string;
  officerName: string;
  testCreated: string;
  status: string;
}
