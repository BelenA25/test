import axios from "axios";
import SubmissionRepository from "../../../../src/modules/Submissions/Repository/SubmissionRepository";
import { submissionInProgressDataMock } from "../../__mocks__/submissions/data/submissionDataMock";

const axiosPostSpy = jest.spyOn(axios, 'post');
const axiosGetSpy = jest.spyOn(axios, 'get');
const mockRepository = new SubmissionRepository();

describe('Create submission', () => {
    it('should create an submission successfully', async () => {
        axiosPostSpy.mockResolvedValue({ status: 201 });
        await expect(mockRepository.createSubmission(submissionInProgressDataMock)).resolves.not.toThrowError();
    });
})

describe('getSubmissionsByAssignmentId', () => {
    it('should return a list of submissions if the request is successful', async () => {
        const mockSubmissions = [submissionInProgressDataMock];
        const mockResponse = { data: mockSubmissions, status: 200 };
        axiosGetSpy.mockResolvedValue(mockResponse);

        const result = await mockRepository.getSubmissionsByAssignmentId(25);
        expect(result).toEqual(mockSubmissions);
    });

    it('should throw an error if getting submissions fails', async () => {
        axiosGetSpy.mockRejectedValue(new Error('Failed to get submissions by assignment ID'));
        await expect(mockRepository.getSubmissionsByAssignmentId(25)).rejects.toThrowError('Failed to get submissions by assignment ID');
    });

    describe('checkSubmissionExists', () => {
        it('should return a response object with hasStarted property when the request is successful', async () => {
          const mockResponse = { data: { hasStarted: true }, status: 200 };
          axiosGetSpy.mockResolvedValue(mockResponse);
      
          const result = await mockRepository.checkSubmissionExists(25, 1);
          expect(result).toEqual({ hasStarted: true });
        });
      
        it('should throw an error if checking submission exists fails', async () => {
          axiosGetSpy.mockRejectedValue(new Error('Failed to check assignment start status'));
          await expect(mockRepository.checkSubmissionExists(25, 1)).rejects.toThrowError('Failed to check assignment start status');
        });
    });
});