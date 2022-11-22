import Link from "next/link";
import { useFormik } from 'formik';
import { createUser } from "../utils/API";
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      age: "",
      weight: "",
      height: ""
    },
    onSubmit: async (values) => {
      const res = await supabaseClient.auth.signUp({ email: values.email, password: values.password }, {
        
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          weight: values.weight,
          height: values.height
        }
      })
       
      await createUser(values, res.user?.id)
      await supabaseClient.auth.signIn({ email: values.email, password: values.password })
      router.push("/")
    },
    // validationSchema: Yup.object({
    // email: Yup.string().email('Invalid Email').required('Required'),
    // firstName: Yup.string().required('Required'),
    // lastName: Yup.string().required('Required'),
    // address: Yup.string().required('Required'),
    // apartment: Yup.string().required('Required'),
    // city: Yup.string().required('Required'),
    // region: Yup.string().required('Required'),
    // postalCode: Yup.string().required('Required'),
    // phone: Yup.string().required('Required'),
    // paymentMethod: Yup.string().required('Required'),
    // cardNumber: Yup.string().required('Required'),
    // cardName: Yup.string().required('Required'),
    // expiration: Yup.string().required('Required'),
    //   cvc: Yup.string()
    //     .min(3, 'three numbers')
    //     .max(3, 'three numbers')
    //     .required('Required'),
    // }),
  })
  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center py-8 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div>
              <img
                width={"180px"}
                src="https://nipsxawvnjrdqkigovgl.supabase.co/storage/v1/object/public/workout/logo-4.png"
                alt="logo"
              />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">SignUp a new account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link href="/login">
                <a
                  className="font-medium hover:text-indigo-500"
                >
                  login to an existing account
                </a>
              </Link>
            </p>
          </div>

          <div className="mt-5">

            <div>
              <form action="#" method="POST" className="space-y-1">
                <div className="flex space-x-10">

                  <div>
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700"
                    >
                      FirstName
                    </label>
                    <div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div >
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      LastName
                    </label>
                    <div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>

                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div  >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <div>
                    <input
                      id="gender"
                      name="gender"
                      type="text"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between space-x-5">
                  <div >
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <div className="relative mt-1 flex items-center">
                      <input
                        id="age"
                        name="age"
                        type="text"
                        autoComplete="age"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        value={formik.values.age}
                        onBlur={formik.handleBlur}
                      />
                      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                          years
                        </kbd>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Weight
                    </label>
                    <div className="relative mt-1 flex items-center">
                      <input
                        id="weight"
                        name="weight"
                        type="text"
                        autoComplete="weight"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        value={formik.values.weight}
                        onBlur={formik.handleBlur}
                      />
                      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                          kgs
                        </kbd>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                      Height
                    </label>
                    <div className="relative mt-1 flex items-center">
                      <input
                        id="height"
                        name="height"
                        type="text"
                        autoComplete="height"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        value={formik.values.height}
                        onBlur={formik.handleBlur}
                      />
                      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                          cm
                        </kbd>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mt-5"
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      event.preventDefault()
                      formik.handleSubmit()
                    }}
                  >
                    SignUp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className='signup-img'></div>
      </div>
    </div>
  );
}
