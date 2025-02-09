import { TReceiver } from "@/constants/receiver";
import { TIndustryType, TInspectionType } from "./samples";

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

interface Sample {
  id: number;
  nameAndDescription: string;
  inspectionType: TInspectionType;
  IndustryType: TIndustryType;
}

interface CollaboratingLab {
  id: number;
  name: string;
}
interface SampleLab {
  id: number;
  deliveryDate: Date;
  receiver: TReceiver;
  postalBarcode: string | null;
  sample: Sample;
  collaboratingLab: CollaboratingLab;
}

export type GroupedSampleLab = {
  sample: Sample;
  labs: Array<Omit<SampleLab, "sample">>;
};

export type TSamplingOperation = {
  Payment: {
    state: boolean;
    id: number;
  };
  id: number;
  productionUnit: {
    name: string;
    id: number;
  };
  sampleLabs: GroupedSampleLab[];
  sampler: { fullname: string };
};
