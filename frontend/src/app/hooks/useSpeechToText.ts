import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * A custom React Hook for managing Speech Recognition with semantic deduplication.
 * Can be used by any form input field inside a react-hook-form FormProvider.
 */
export function useSpeechToText(fieldName: string) {
	const methods = useFormContext();
	const [isListening, setIsListening] = useState(false);
	const recognitionRef = useRef<any>(null);

	if (!methods) {
		throw new Error('useSpeechToText must be used within a FormProvider');
	}

	const toggleListening = () => {
		const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		
		if (!SpeechRecognition) {
			alert('El reconocimiento de voz no está soportado en este navegador. Por favor use Google Chrome.');
			return;
		}

		if (isListening) {
			if (recognitionRef.current) {
				recognitionRef.current.isManuallyStopped = true;
				recognitionRef.current.stop();
			}
			setIsListening(false);
		} else {
			if (recognitionRef.current) {
				recognitionRef.current.isManuallyStopped = true;
				recognitionRef.current.abort();
			}

			const recognition = new SpeechRecognition();
			recognition.lang = 'es-ES';
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.isManuallyStopped = false;

			let sessionInitialValue = '';

			recognition.onstart = () => {
				setIsListening(true);
				sessionInitialValue = (methods.getValues(fieldName) as string) || '';
			};

			recognition.onresult = (event: any) => {
				const parts: string[] = [];
				for (let i = 0; i < event.results.length; i++) {
					const text = event.results[i][0].transcript.trim();
					if (text) {
						parts.push(text);
					}
				}

				// Algoritmo de deduplicación semántica para evitar que Chrome repita oraciones acumuladas
				const filtered: string[] = [];
				for (let i = 0; i < parts.length; i++) {
					let isRedundant = false;
					for (let j = i + 1; j < parts.length; j++) {
						const currentNorm = parts[i].toLowerCase().replace(/\s+/g, '');
						const nextNorm = parts[j].toLowerCase().replace(/\s+/g, '');
						if (nextNorm.startsWith(currentNorm)) {
							isRedundant = true;
							break;
						}
					}
					if (!isRedundant) {
						filtered.push(parts[i]);
					}
				}

				const sessionTranscript = filtered.join(' ');

				if (sessionTranscript) {
					const newVal = sessionInitialValue ? `${sessionInitialValue} ${sessionTranscript}`.trim() : sessionTranscript.trim();
					methods.setValue(fieldName, newVal, { shouldDirty: true, shouldValidate: true });
				}
			};

			recognition.onerror = (event: any) => {
				console.error('Speech recognition error:', event.error);
				if (event.error !== 'no-speech') {
					recognition.isManuallyStopped = true;
					setIsListening(false);
				}
			};

			recognition.onend = () => {
				if (!recognition.isManuallyStopped) {
					try {
						recognition.start();
					} catch (e) {
						setIsListening(false);
					}
				} else {
					setIsListening(false);
				}
			};

			recognitionRef.current = recognition;
			recognition.start();
		}
	};

	return {
		isListening,
		toggleListening
	};
}
