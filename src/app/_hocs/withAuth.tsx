// import React from 'react'
// import { useAuthContext } from '../_contexts/AuthContextProvider'
// import { useRouter } from 'next/navigation';

// export default function withAuth(WrappedComponent: React.Component) {
//   return function WithAuth(props: any) {
//     const router = useRouter();
//     const {isAuthenticated} = useAuthContext();
//     if (!isAuthenticated) {
//       router.push('/'); 
//       return null;
//     }

//     return <WrappedComponent {...props} />
//   }
// }
