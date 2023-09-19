import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async (request) => {

	try {
		const userEmail = request.nextUrl.searchParams.get('userEmail');
		await connect();
		const user = await User.findOne({ email: userEmail });
		return new NextResponse(JSON.stringify(user), { status: 200 });
	} catch (error) {
		console.log(error.name, error.message);
		return NextResponse.json({ error: error.message });
	}
};


// Update LoggedIn UserInformation
export const PUT = async (request)=> {
	try {
		
		const  { id,  newProfileInfo } = await request.json();
		console.log(id)
		console.log(newProfileInfo);

		await connect();
		await User.findByIdAndUpdate(id, {newProfileInfo} );
		return NextResponse.json({ message: 'user information updated' }, { status: 200 });
	} catch (error) {
		console.log(error.name, error.message);
		return NextResponse.json({ error: error.message });
	}
}