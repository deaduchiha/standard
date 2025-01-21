export type TCollaboratingLab = {
  id: number;
  name: string;
  nationalID: string;
  economicCode: string;
  address: string;
  lat: number;
  lng: number;
  postalCode: string;
  phone: string;
  email: string;
  CEOName: string;
  CEOPhone: string;
  technicalManagerName: string;
  samples: [{}];
};

export type TCollaboratingLabs = {
  statusCode: number;
  collaboratingLabs: TCollaboratingLab[];
  totalPages: number;
};
