export type SignUpDto = Readonly<{
  email: string;
  password?: string;
  phone?: string;
  role: string;
}>;
