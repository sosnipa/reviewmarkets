import { clearAdminSession } from '@/lib/auth';

export async function POST() {
  return clearAdminSession();
}
