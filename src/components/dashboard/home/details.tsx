import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

const Details = ({
  title,
  Icon,
  quantity,
}: {
  title: string;
  Icon: LucideIcon;
  quantity: string;
}) => {
  return (
    <Card className="bg-white/10 hover:bg-white/40 duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{title}</span>
          <Icon />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{quantity}</p>
      </CardContent>
    </Card>
  );
};

export default Details;
