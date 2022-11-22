import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next'
import PersonalRecordsCard from '../components/personalRecordsCard';
import Progress from '../components/progress';
import { prisma } from "../lib/prisma";

const Home: NextPage = ({ personalRecords, userProgressChart, user }: any) => {

  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-zinc-100 py-10 w-full min-h-screen">
        <div className='bg-white py-5 px-7 drop-shadow'>
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-14 w-14 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-900">Good morning, {user.user_metadata.firstName}</p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">🔥10 Day Streak</p>
            </div>
          </div>
        </div>
        <div className='m-5'>
          <p className='my-5 text-lg font-bold'>Personal Records 🏆</p>
          <PersonalRecordsCard personalRecords={personalRecords} />
          <div >
            <p className='my-5 text-lg font-bold'>Progress</p>
            <Progress userProgressChart={userProgressChart} />
          </div>
        </div>

      </div>
    </>
  )
}

export default Home;

export const getServerSideProps = withPageAuth({
  redirectTo: '/login', async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);


    const userProgressChart = await prisma.workoutLine.findMany({
      include: {
        users: {
          where: { userId: user.id },
          select: {
            weight: true
          }
        }, exercise: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        exercise: {
          createdAt: 'desc',
        }
      },
    })

    const personalRecords = await prisma.workoutLine.findMany({
      include: {
        users: {
          where: { userId: user.id },
          orderBy: [
            {
              weight: 'desc'
            }
          ],
          take: 1
        }, exercise: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        exercise: {
          createdAt: 'desc',
        }
      },
    })
    return { props: { personalRecords: JSON.parse(JSON.stringify(personalRecords)), userProgressChart: JSON.parse(JSON.stringify(userProgressChart)) } };
  }
});