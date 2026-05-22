import { ClientOnly } from '@/components/shared/ClientOnly';
import UserClient from './UserClient';

export default function UserPage() {
  return <ClientOnly><UserClient /></ClientOnly>;
}
