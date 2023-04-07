export interface CustomButtonProps {
  active?: boolean;
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  border?: string;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface ProfileProps {
  type: string;
  name: string;
  avatar: string;
  email: string;
  properties: Array | undefined;
  country?: string;
  phone?: string;
  emailVerified?: boolean;
}

export interface PropertyProps {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  photos: string[];
  creator: string;
}

export interface FormProps {
  type: string;
  register: any;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file) => void;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  propertyImage?: { name: string; url: string }[];
  backendImages?: string[];
  setBackendImages?: Dispatch<SetStateAction<string[]>>;
  mode: string;
}
