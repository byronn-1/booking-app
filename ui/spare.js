const signUp = async ({
    first_name,
    last_name,
    username,
    password,
    phone_number,
    country,
    club_name,
    club_type,
    street_number,
    street_name,
    address_line2,
    city,
    state,
    postal_code,
    is_club_private,
    website_url,
    setSubmitting }) => {

    await initializeUserPool();
    let finalPhoneNumber = '';
    let is_club_private_bool = false;

    if (phone_number) {
        finalPhoneNumber = phone_number.startsWith('0') ? phone_number.substring(1) : phone_number;
        finalPhoneNumber = finalPhoneNumber.startsWith(country) ? finalPhoneNumber : country + finalPhoneNumber;
    }
    if (is_club_private === '1') {
        is_club_private_bool = true;
    }
    console.log(finalPhoneNumber)
    const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: username }),
        new CognitoUserAttribute({ Name: 'phone_number', Value: finalPhoneNumber }),
    ];

    const bypassCognito = false;

    let cognitoResponse = null
    try {
        if (!bypassCognito) {
            cognitoResponse = await new Promise((resolve, reject) => {

                userPool.signUp(username, password, attributeList, null, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result)
                    }
                });
            });
        }
        /*       console.log({
                clubName: club_name,
                clubType: club_type,
                streetNumber: street_number,
                streetName: street_name,
                addressLine2: address_line2,
                city,
                state,
                postalCode: postal_code,
                country,
                isClubPrivate: is_club_private_bool,
                websiteUrl: website_url,
                firstName: first_name,
                lastName: last_name,
                phoneNo: finalPhoneNumber,
                email: username,
              }); */

        if (cognitoResponse || bypassCognito) {
            const clubResponse = await graphqlClient.mutate({
                mutation: CREATE_CLUB_MUTATION,
                variables: {
                    clubInput: {
                        clubName: club_name,
                        clubType: club_type,
                        streetNumber: street_number,
                        streetName: street_name,
                        addressLine2: address_line2,
                        city,
                        state,
                        postalCode: postal_code,
                        country,
                        isClubPrivate: is_club_private_bool,
                        websiteUrl: website_url,
                    },
                },
            });

            console.log(clubResponse);

            if (clubResponse != null) {
                const clubId = clubResponse.data.createClub.id;
                console.log(clubId)
                const ownerResponse = await graphqlClient.mutate({
                    mutation: ADD_OWNER_MUTATION,
                    variables: {
                        ownerInput: {
                            firstName: first_name,
                            lastName: last_name,
                            phoneNo: finalPhoneNumber,
                            email: username,
                            club: clubId
                        },
                    },
                });
                if (ownerResponse.data && ownerResponse.addOwner) {
                    navigate('/owner-menu')
                }
            }
        }

    } catch (apiError) {
        console.log('Error during club/owner creation:', apiError);
    } finally { setSubmitting(false); }
};