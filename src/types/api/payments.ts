export type TPayment = {
  id: number;
  state: boolean;
  number: number;
  pricePerUnit: number;
  transportationPrice: number;
  samplerTransportation: boolean;
  samplerTransportationDistance: number | null;
  samplerTransportationStop: number | null;
  samplerTransportationPrice: number | null;
  createdAt: string;
  samplingOperationId: number;
  SamplingOperation: {
    productionUnit: {
      name: string;
    };
  };
};

export type TPayments = {
  statusCode: number;
  payments: TPayment[];
  totalPages: number;
};
