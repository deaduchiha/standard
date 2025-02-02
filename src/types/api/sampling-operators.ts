export type TSampleLab = {
  id: number;
  deliveryDate: string;
  receiver: string;
  sample: {
    barcode: string;
    nameAndDescription: string;
    inspectionType: string;
    IndustryType: string;
  };
  collaboratingLab: {
    name: string;
    address: string;
    phone: string;
  };
};

export type TSamplingOperation = {
  id: number;
  sampler: { fullname: string };
  productionUnit: {
    name: string;
    brandName: string;
    address: string;
    phone: string;
  };
  Payment: {
    state: boolean;
    number: number;
    pricePerUnit: number;
    transportationPrice: number;
  };
  sampleLabs: TSampleLab[];
};
