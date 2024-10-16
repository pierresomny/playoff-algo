import {MutableRefObject, useEffect, useState} from 'react';
import {DataSnapshot, onValue, ref, remove, set, update} from 'firebase/database';
import {database} from '@playoff/core/firebase/firebase.config.ts';
import {editor, IDisposable, Position, Range, Selection} from 'monaco-editor';
import {Location, useLocation, useParams} from 'react-router-dom';


/**
 * Hook to provide an exercise object and listen for changes from realtime database.
 */
export const useExerciseSession = (exerciseUid: string | undefined): [
	string,
	(response: string) => Promise<void>
] => {
	const {playoffUid} = useParams<{ playoffUid: string }>();
	const path: string = `playoff-session/${playoffUid}/exercises/${exerciseUid}`
	const [response, setResponse] = useState<string>('');
	
	useEffect(() => {
		onValue(ref(database, `${path}/response`), (response) => {
			if (response.exists()) {
				console.log('response', response.exportVal());
				setResponse(response.val());
			}
		})
	}, [path]);
	
	/**
	 * Handle response changes
	 * @param response {string}
	 */
	const changeResponse = async (response: string) => {
		await update(ref(database, path), {response})
	}
	return [response, changeResponse]
}

export const useCursorExercise = (
	exerciseUid: string | undefined,
	editorRef: MutableRefObject<editor.IStandaloneCodeEditor | undefined>
): void => {
	const {playoffUid} = useParams<{ playoffUid: string }>();
	const location: Location = useLocation()
	const local: string = location.pathname.startsWith('/recruiter') ? 'recruiter' : 'candidate';
	const distant: string = !location.pathname.startsWith('/recruiter') ? 'recruiter' : 'candidate';
	
	useEffect((): () => void => {
		const selectionPath: string = `playoff-session/${playoffUid}/exercises/${exerciseUid}/selection/${local}`;
		const cursorPath: string = `playoff-session/${playoffUid}/exercises/${exerciseUid}/cursor/${local}`;
		let listenerCursorSelection: IDisposable;
		let listenerCursorPosition: IDisposable;
		if (editorRef.current) {
			listenerCursorSelection = editorRef.current.onDidChangeCursorSelection((event: editor.ICursorSelectionChangedEvent): Promise<void> => {
				return set(ref(database, selectionPath), event.selection);
			});
			listenerCursorPosition = editorRef.current.onDidChangeCursorPosition((event: editor.ICursorPositionChangedEvent): Promise<void> => {
				return set(ref(database, cursorPath), event.position);
			});
		}
		return () => {
			remove(ref(database, selectionPath)).then(listenerCursorSelection?.dispose)
			remove(ref(database, cursorPath)).then(listenerCursorPosition?.dispose)
		}
	}, [editorRef, exerciseUid, local, playoffUid]);
	
	useEffect(() => {
		const selectionPath: string = `playoff-session/${playoffUid}/exercises/${exerciseUid}/selection/${distant}`;
		const cursorPath: string = `playoff-session/${playoffUid}/exercises/${exerciseUid}/cursor/${distant}`;
		let listenerCursorSelection: editor.IEditorDecorationsCollection | undefined;
		let listenerCursorPosition: editor.IEditorDecorationsCollection | undefined;
		if (editorRef.current) {
			onValue(ref(database, selectionPath), (result: DataSnapshot): void => {
				if (result.exists()) {
					const selection: Selection = result.val();
					listenerCursorSelection?.clear();
					listenerCursorSelection = editorRef.current?.createDecorationsCollection([{
						range: new Range(
							selection.selectionStartLineNumber,
							selection.selectionStartColumn,
							selection.positionLineNumber,
							selection.positionColumn
						),
						options: {
							stickiness: editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
							className: 'remote-selection',
							hoverMessage: {value: `**${distant}**`},
						},
					}]);
					console.log(listenerCursorSelection);
				}
			});
			onValue(ref(database, cursorPath), (result: DataSnapshot): void => {
				if (result.exists()) {
					const cursor: Position = result.val()
					console.log(`cursor ${distant}`, cursor);
					listenerCursorPosition?.clear()
					listenerCursorPosition = editorRef.current?.createDecorationsCollection([{
						range: new Range(
							cursor.lineNumber,
							cursor.column,
							cursor.lineNumber,
							cursor.column
						),
						options: {
							className: 'remote-cursor',
							afterContentClassName: 'remote-cursor-label',
							after: {
								content: `› ${distant}`, // Affiche le nom de l'utilisateur après le curseur
							},
							hoverMessage: {value: distant}
						}
					}])
					console.log(listenerCursorPosition?.getRanges());
				}
			});
		}
	}, [distant, editorRef, exerciseUid, playoffUid]);
}
