import { SignUp, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import LoadingWidget from '@/components/global/LoadingWidget';

export default function Page() {
  return (
    <MaxWidthWrapper className="mb-40 mt-10 flex items-center justify-center min-h-[60vh]">
      <ClerkLoading>
        <LoadingWidget />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp fallbackRedirectUrl="/dashboard" />
      </ClerkLoaded>
    </MaxWidthWrapper>
  );
}
