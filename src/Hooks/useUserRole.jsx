// hooks/useUserRole.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import UseAuth from './useAuth';

const useUserRole = () => {
  const { user, loading } = UseAuth();
  const email = user?.email;

  const {
    data: role = {},
    isLoading : isRoleLoading,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!email && !loading, 
    queryFn:async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/role/${user?.email}`);
       return data.role;
    },
  });
  console.log(role);

  return { role, isRoleLoading };
};

export default useUserRole;