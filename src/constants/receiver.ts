export type TReceiver = "Lab" | "Lab Representative" | "Postal Companies";

export const receiverMap: Record<TReceiver, string> = {
  Lab: "آزمایشگاه",
  "Lab Representative": "نماینده آزمایشگاه",
  "Postal Companies": "شرکت های پستی",
};

export const receiverType = (receiver: TReceiver) => {
  return receiverMap[receiver] || null;
};
