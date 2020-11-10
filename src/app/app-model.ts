export class User {
  userID: string;
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
  result: string;
  resultCreated: string;
}

export class TestCenter {
  centerID: string;
  name: string;
  managerID: string;
}

export class TestKit {
  kitID: string;
  name: string;
  stock: number;
  centerID: string;
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
  kitID: string;
  name: string;
  stock: number;
  centerName: string;
}

export interface GenerateReport {
  centerID: string;
  centerName: string;
  managerName: string;
  testCases: TestCaseViewModel[];
}

export interface TestCaseViewModel {
  testID: string;
  patientName: string;
  officerName: string;
  testCreated: string;
  status: string;
}
