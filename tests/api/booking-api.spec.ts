import { test, expect } from '@playwright/test'
// ================= HELPERS =================
const BASE_URL = 'https://restful-booker.herokuapp.com';

async function createAuthToken(request: any) {
  const authData = {
    username: 'admin',
    password: 'password123',
  };

  const authResponse = await request.post(`${BASE_URL}/auth`, {
    data: authData,
  });

  expect(authResponse.status()).toBe(200);

  const authBody = await authResponse.json();

  return authBody.token;
}

async function createBooking(request: any, bookingData: any) {
  const createBookingResponse = await request.post(`${BASE_URL}/booking`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: bookingData,
  });

  expect(createBookingResponse.status()).toBe(200);

  const createBookingBody = await createBookingResponse.json();

  return createBookingBody.bookingid;
}

// ================= TESTS =================

test ('GET booking ids', async( { request}) => {

  // Send GET request to retrive all booking IDs
  const response = await request.get(`${BASE_URL}/booking`);

  // Verify successful Response
  expect(response.status()).toBe(200);

  // Convert Response to JSON
  const body = await response.json();

  // Verify Response contains at least one booking
  expect(body.length).toBeGreaterThan(0);

  // Verify first obj contains booking field
  expect(body[0]).toHaveProperty('bookingid')
  

  // Verify bookinid ID type number
  expect(typeof body[0].bookingid).toBe('number');

});

test('GET booking by id', async ({ request }) => {

  // Send GET request to retrive all booking IDs
  const bookingIdsResponse = await request.get(`${BASE_URL}/booking`);

  // Convert Response to JSON
  const bookingIdsBody = await bookingIdsResponse.json();

  // Get first booking ID from the Response
  const bookingId = bookingIdsBody[0].bookingid;

  // Send GET request to retrive booking details by ID
  const bookingResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);

  // Verify seccessful Response
  expect(bookingResponse.status()).toBe(200);

  //  Conver booking details Response to JSON 
  const bookingBody = await bookingResponse.json();
  console.log(bookingBody)

  // Verify firstname field exists and Verify type of firstname
  expect(bookingBody).toHaveProperty('firstname');
  expect(typeof(bookingBody.firstname)).toBe('string');

  // Verify lastname field exists and Verify type of lastname
  expect(bookingBody).toHaveProperty('lastname');
  expect(typeof(bookingBody.lastname)).toBe('string');

  // Verify totalprice field exists and Verify totalprice value is number
  expect(bookingBody).toHaveProperty('totalprice');
  expect(typeof(bookingBody.totalprice)).toBe('number');
  

  // Verify depositpaid field exists and Verify type of depositpaid value
  expect(bookingBody).toHaveProperty('depositpaid');
  expect(typeof(bookingBody.depositpaid)).toBe('boolean');
  

  // Verify bookingdates field exisits and type of value is object
  expect(bookingBody).toHaveProperty('bookingdates');
  expect(typeof(bookingBody.bookingdates)).toBe('object');
  

  // Verify checkin field exists anv type of value is string
  expect(bookingBody.bookingdates).toHaveProperty('checkin');
  expect(typeof(bookingBody.bookingdates.checkin)).toBe('string');

  // Verify checkot field exists and type of value is string
  expect(bookingBody.bookingdates).toHaveProperty('checkout');
  expect(typeof(bookingBody.bookingdates.checkout)).toBe('string');

  // Verify additionalneeds field exists and type of value is string
  // expect(bookingBody).toHaveProperty('additionalneeds');
  // expect(typeof(bookingBody.additionalneeds)).toBe('string');

 
})

test('POST create booking', async ({ request }) => {
  // Prepare request body
  const newBooking = {
  "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
};

  // Send POST request to create a new booking
  const response = await request.post(
     `${BASE_URL}/booking`,
     {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: newBooking,
    }
  );
  
  // Verify booking was created
  expect(response.status()).toBe(200);

  // Convert Response to JSON
  const responseBody = await response.json();

  // Verify bookingid exists and is a number
  expect(responseBody).toHaveProperty('bookingid');
  expect(typeof responseBody.bookingid).toBe('number');

  // Verify booking object exists
  expect(responseBody).toHaveProperty('booking');
  expect(typeof responseBody.booking).toBe('object');
 

  // Verify firstname field exist inside booking obj and Verify typeof the value
  expect(responseBody.booking).toHaveProperty('firstname');
  expect(typeof responseBody.booking.firstname).toBe('string');

  // Verify lastname property and type of the value
  expect(responseBody.booking).toHaveProperty('lastname');
  expect(typeof responseBody.booking.lastname).toBe('string');

  // Verify totalprice property and type of the value
  expect(responseBody.booking).toHaveProperty('totalprice');
  expect(typeof responseBody.booking.totalprice).toBe('number');

  // Verify depositpaid property and type of the value
  expect(responseBody.booking).toHaveProperty('depositpaid');
  expect(typeof responseBody.booking.depositpaid).toBe('boolean');

  // Verify bookingdates property and type of the value
  expect(responseBody.booking).toHaveProperty('bookingdates');
  expect(typeof(responseBody.booking.bookingdates)).toBe('object');
  
  // Verify bookingdates has property checkin and checkout and their typeof value
  expect(responseBody.booking.bookingdates).toHaveProperty('checkin');
  expect(typeof responseBody.booking.bookingdates.checkin).toBe('string');
  expect(responseBody.booking.bookingdates).toHaveProperty('checkout');
  expect(typeof responseBody.booking.bookingdates.checkout).toBe('string');

  // Verify additionalneeds property and type of it's value
  expect(responseBody.booking).toEqual(
    expect.objectContaining({
      additionalneeds: expect.any(String)
    })
  );
  
})
  
test('POST create auth token', async ({request}) => {
  const authData = {
    username: 'admin',
    password: 'password123',
  };

  // Send POST request to create auth token
  const response = await request.post(
    `${BASE_URL}/auth`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data: authData,
    }
  );

  // Verify auth request was successful
  expect(response.status()).toBe(200);

  // Convert responce to JSON
  const responseBody = await response.json();

  // Verify token field property exists and type of value
  expect(responseBody).toEqual(
    expect.objectContaining({
      token: expect.any(String)
    })
  );
})


test('PUT update booking', async ({ request}) =>{

  // Prepare request body to create a booking
  const newBooking = {
  "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
  };
  const bookingId = await createBooking(request, newBooking);


  // Create auth token for PUT request
  const authToken = await createAuthToken(request);

  // Prepare updated booking data
  const updatedBookingData = {
    firstname: 'Alex',
    lastname: 'Johnson',
    totalprice: 250,
    depositpaid: false,
    bookingdates: {
      checkin: '2025-02-01',
      checkout: '2025-02-05',
    },
    additionalneeds: 'Dinner',
  };

  // Send PUT request to update booking
  const updateResponse = await request.put(
    `${BASE_URL}/booking/${bookingId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${authToken}`,
      },
      data: updatedBookingData,
    }
  );
  
  expect(updateResponse.status()).toBe(200);

  // Convert to JSON
  const updateResponseBody = await updateResponse.json();


// Verify response structure
expect(updateResponseBody).toEqual(
  expect.objectContaining({
    firstname: expect.any(String),
    lastname: expect.any(String),
    totalprice: expect.any(Number),
    depositpaid: expect.any(Boolean),
    bookingdates: expect.any(Object),
    additionalneeds: expect.any(String),
  })
);

// Verify updated values
expect(updateResponseBody).toEqual(
  expect.objectContaining({
    firstname: updatedBookingData.firstname,
    lastname: updatedBookingData.lastname,
    totalprice: updatedBookingData.totalprice,
    depositpaid: updatedBookingData.depositpaid,
    additionalneeds: updatedBookingData.additionalneeds,
  })
);
  // Verify booking dates
  expect(updateResponseBody.bookingdates).toEqual(
    expect.objectContaining({
      checkin: updatedBookingData.bookingdates.checkin,
      checkout: updatedBookingData.bookingdates.checkout,
    })
  );
})


test('PATCH partially update booking', async ({ request }) => {
  const newBooking = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01',
    },
    additionalneeds: 'Breakfast',
  };

  const bookingId = await createBooking(request, newBooking);
  const authToken = await createAuthToken(request);

  const partialUpdateData = {
    depositpaid: false,
  };

  const patchResponse = await request.patch(
    `${BASE_URL}/booking/${bookingId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${authToken}`,
      },
      data: partialUpdateData,
    }
  );

  expect(patchResponse.status()).toBe(200);

  const patchResponseBody = await patchResponse.json();

  expect(patchResponseBody.depositpaid).toBe(partialUpdateData.depositpaid);
});
  

test('DELETE booking', async ({ request }) => {
  const newBooking = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01',
    },
    additionalneeds: 'Breakfast',
  };

  const bookingId = await createBooking(request, newBooking);
  const authToken = await createAuthToken(request);

  const deleteResponse = await request.delete(
    `${BASE_URL}/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${authToken}`,
      },
    }
  );

  expect(deleteResponse.status()).toBe(201);
});



  















  


  















  

  





  

  
  











