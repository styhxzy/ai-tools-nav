import { ClientOnly } from '@/components/shared/ClientOnly';
import SignUpClient from './SignUpClient';

export default function SignUpPage() {
  return <ClientOnly><SignUpClient /></ClientOnly>;
}
