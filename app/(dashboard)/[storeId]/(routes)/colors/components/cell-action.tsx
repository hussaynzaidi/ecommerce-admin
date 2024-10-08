import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorColumn } from "../../colors/components/columns";
import { Button } from "@/components/ui/button";
import { Edit, Copy, Trash2, MoreHorizontal } from "lucide-react";
import {toast} from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modals";

interface CellActionProps {
  data: ColorColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete( `/api/${params.storeId}/colors/${data.id}`);
      router.refresh();
      toast.success("Color deleted");
    } catch (error) {
      toast.error("Have you deleted all products using this color first?");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };


  return (
    <>
    <AlertModal
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="h-4 w-4 mr-2"/>
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}>
          <Edit className="h-4 w-4 mr-2" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpen(true)}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu></>
  );
};
