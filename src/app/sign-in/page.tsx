import { ClientOnly } from '@/components/shared/ClientOnly';
import SignInClient from './SignInClient';

export default function SignInPage() {
  return <ClientOnly><SignInClient /></ClientOnly>;
}
