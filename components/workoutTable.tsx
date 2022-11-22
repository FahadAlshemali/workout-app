import { useFormik } from 'formik';
import { useState } from 'react';
import { addUserRecord } from '../utils/API';
import CheckBox from './checkBox';

const WorkoutTable = ({ exercise, sets }: any) => {
  const [step, setStep] = useState(0)

  const formik = useFormik({
    initialValues: {
      reps: exercise.workoutLineRelation[0].reps,
      weight: exercise.workoutLineRelation[0].weight
    },
    onSubmit: async (values) => {
      addUserRecord(values.weight, values.reps,  step, exercise.workoutLineRelation[0].id)
      
    }
  })
  return (
    <div className="m-10">
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Weight (KG)
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Reps
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sets.map((set: any, index: number) => (
                    <tr key={index}>
                      <CheckBox index={index} set={set} formik={formik} setStep={setStep} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTable;
