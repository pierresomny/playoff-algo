import {ReactElement} from 'react';

export const CandidateTutoModal = (props: {
	closeModal: () => void
}): ReactElement => {
	const {
		closeModal
	} = props;
	
	return <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
		<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div
					className="relative transform overflow-hidden rounded-lg bg-gray-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
					<div>
					
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<button type="button"
						        onClick={closeModal}
						        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Fermer
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
}
