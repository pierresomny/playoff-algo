import {MutableRefObject, ReactElement, useRef} from 'react';
import {Editor, OnMount} from '@monaco-editor/react';
import {useCursorExercise, useExerciseSession} from '@playoff/shared/hooks/exerciseSession.hook.ts';
import {editor} from 'monaco-editor';
import {useExercise} from '@playoff/shared/hooks/exercise.hook.ts';
import {Exercise} from '@playoff/core/model/exercise.model.ts';

export const ExerciseComponent = (
	props: {
		exerciseUid: string
	}
): ReactElement => {
	const {exerciseUid} = props
	const editorRef: MutableRefObject<editor.IStandaloneCodeEditor | undefined> = useRef<editor.IStandaloneCodeEditor>();
	const exercise: Exercise | undefined = useExercise(exerciseUid);
	const [response, changeResponse] = useExerciseSession(exerciseUid);
	useCursorExercise(exerciseUid, editorRef);
	
	const test: OnMount = (editor) => {
		editorRef.current = editor;
	}
	
	// const addCursorWithUser = (lineNumber: number, column: number, username: string) => {
	// 	if (editorRef.current) {
	// 		decorations['username']?.clear();
	// 		decorations['username'] = editorRef.current.createDecorationsCollection(
	// 			[
	// 				{
	// 					range: new monaco.Range(lineNumber, column, lineNumber, column + 4),
	// 					options: {
	// 						stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
	// 						className: 'highlight',
	// 						hoverMessage: {value: `**${username}**`},
	// 						afterContentClassName: 'cursor-label',
	// 						after: {
	// 							content: `${username}`,
	// 							inlineClassName: 'identity-tooltip',
	// 							cursorStops: monaco.editor.InjectedTextCursorStops.None
	// 						}
	// 					},
	// 				}
	// 			]
	// 		)
	// 		setDecorations(decorations);
	// 		console.log('cursor should be present now');
	// 		console.log(editorRef.current.getLineDecorations(1));
	// 	}
	// };
	//
	if (!exercise) return <></>;
	
	return <div className={'flex justify-center flex-col items-center h-90vh'}>
		<div className={'flex justify-between'}>
			<h1 className={'text-3xl mt-8 mb-6'}>{exercise.title}</h1>
			<i className={'text-2xl font-normal self-end'}>{exercise.content}</i>
		</div>
		<div className={'min-h-96 w-full'}>
			<Editor width={'100%'} height={'70vh'} className={'editor h-full'}
			        value={response}
			        onChange={response => changeResponse(response ?? '')}
			        theme={'vs-dark'}
			        onMount={test}
			        options={{
				        wordWrap: 'on'
			        }}
			
			/>
		</div>
	</div>
}
