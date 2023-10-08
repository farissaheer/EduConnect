import {apiSlice} from '../apiSlice'
import Cookies from 'js-cookie'
const USER_URL = '/user'

const retrieveToken = Cookies.get("userDetails")
const jwtToken = retrieveToken ? retrieveToken : "";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        signup : builder.mutation ({
            query: (data) => ({
                url: `${USER_URL}/userSignUp`,
                method: 'post',
                body : data
            })
        }),
        login : builder.mutation ({
            query : (data) => ({
                url : `${USER_URL}/userLogin`,
                method: 'post',
                body : data
            })
        }),
        mobileOTP : builder.mutation ({
            query: (data) => ({
                url: `${USER_URL}/createAccountOTP`,
                method: 'post',
                body: data
            })
        }),
        verifyOTP : builder.mutation ({
            query: (data) => ({
                url: `${USER_URL}/CheckOTP`,
                method: 'post',
                body: data
            })
        }),
        resetPassword : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/resetPassword`,
                method:'PUT',
                body: data
            })
        }),
        createAccountOTP : builder.mutation ({
            query : (data) => ({
                url:`${USER_URL}/createAccountOTP`,
                method: 'post',
                body: data
            })
        }),
        updateDetails: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/userDetailsUpdate`,
              method: 'PUT', // Change the HTTP method to PUT
              body: data,
            }),
          }),
        GetLoginUser : builder.mutation ({
            query: (data) => ({
                url: `${USER_URL}/getUser`,
                method: 'get',
                params: data,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwtToken}`, // Include JWT token in the Authorization header
                },
            })
        })
       
    })
    
})


export const {
    useSignupMutation,
    useLoginMutation,
    useMobileOTPMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
    useCreateAccountOTPMutation,
    useUpdateDetailsMutation,
    useGetLoginUserMutation
} = userApiSlice;