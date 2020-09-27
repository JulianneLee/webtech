export interface Manager {
  username: string;
  password: string;
  name: string;
  position: string;
}

export interface Patient {
  patientID: string;
  username: string;
  password: string;
  name: string;
}

export interface Test {
  testID: string;
  patientID: string;
  type: string;
  symptom: string;
  officerID: string;
  testCreated: string;
  status: string;
}

export interface PatientTest {
  testID: string;
  name: string;
  type: string;
  symptom: string;
  testCreated: string;
  status: string;
}
