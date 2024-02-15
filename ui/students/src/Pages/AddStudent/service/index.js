import { ADD_STUDENT_MUTATION } from '../../../_graphQL/mutations/StudentMutations';
import { graphqlClient } from '../../../graphql';


export const addStudentService = async (studentData) => {
  try {
    const response = await graphqlClient.mutate({
      mutation: ADD_STUDENT_MUTATION,
      variables: {
        input: studentData,
      },
    });
    return response.data.addStudent;
  } catch (error) {
    throw error;
  }
};
