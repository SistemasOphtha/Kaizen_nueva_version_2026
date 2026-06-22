import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils/FuseUtils';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
// import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useCallback, useEffect } from 'react';
import * as yup from 'yup';
// import _ from '@lodash';
import { Popover } from '@mui/material';
import { format, parseISO } from 'date-fns';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppDispatch, useAppSelector } from 'app/store';
import { closeEditEventDialog, closeNewEventDialog, selectEventDialog } from '../../store/eventsSlice';
import EventLabelSelect, { EventLabelSelectProps } from '../../EventLabelSelect';
import EventModel from '../../models/EventModel';
import { selectFirstLabelId } from '../../store/labelsSlice';
import { EventType } from '../../types/EventType';

const defaultValues = EventModel();

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({
	id: yup.string(),
	title: yup.string().required('You must enter a title'),
	start: yup.string().required('Please enter start date'),
	end: yup.string(),
	allDay: yup.bool(),
	extendedProps: yup.object().shape({
		desc: yup.string(),
		label: yup.number()
	})
});

/**
 * The event dialog.
 */
function EventDialog() {
	const dispatch = useAppDispatch();
	const eventDialog = useAppSelector(selectEventDialog);
	const firstLabelId = useAppSelector(selectFirstLabelId);

	const { reset, formState, watch, control } = useForm<EventType>({
		defaultValues,
		mode: 'onChange',
		resolver: yupResolver(schema)
	});

	const { errors } = formState;

	const start = watch('start');
	const end = watch('end');
	// const id = watch('id');

	/**
	 * Initialize Dialog with Data
	 */
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (eventDialog.type === 'edit' && eventDialog.data) {
			reset({ ...eventDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (eventDialog.type === 'new') {
			reset({
				...defaultValues,
				...eventDialog.data,
				extendedProps: {
					...defaultValues.extendedProps,
					label: firstLabelId
				},
				id: FuseUtils.generateGUID()
			});
		}
	}, [eventDialog.data, eventDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (eventDialog.props.open) {
			initDialog();
		}
	}, [eventDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeComposeDialog() {
		return eventDialog.type === 'edit' ? dispatch(closeEditEventDialog()) : dispatch(closeNewEventDialog());
	}

	/**
	 * Form Submit
	 */
	// function onSubmit(ev: MouseEvent<HTMLButtonElement>) {
	// 	ev.preventDefault();
	// 	const data = getValues();

	// 	if (eventDialog.type === 'new') {
	// 		dispatch(addEvent(data));
	// 	} else {
	// 		dispatch(updateEvent({ ...eventDialog.data, ...data }));
	// 	}
	// 	closeComposeDialog();
	// }

	/**
	 * Remove Event
	 */
	// function handleRemove() {
	// 	dispatch(removeEvent(id));
	// 	closeComposeDialog();
	// }

	function formatDate(date?: string | null) {
		if (!date) {
			return '-';
		}
		try {
			return format(parseISO(date), 'dd-MM-yyyy HH:mm:ss');
		} catch (error) {
			console.warn('Invalid date value received in EventDialog:', date, error);
			return '-';
		}
	}

	return (
		<Popover
			{...eventDialog.props}
			open={eventDialog.props.open}
			anchorReference="anchorPosition"
			anchorOrigin={{
				vertical: 'center',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'center',
				horizontal: 'left'
			}}
			onClose={closeComposeDialog}
			component="form"
		>
			<div className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480">
				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex mt-16"
						color="action"
					>
						heroicons-outline:pencil-alt
					</FuseSvgIcon>
					<Controller
						name="title"
						control={control}
						render={({ field }) => <h2 className="mt-16">{field.value}</h2>}
					/>
				</div>

				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex mt-16"
						color="action"
					>
						heroicons-outline:calendar
					</FuseSvgIcon>
					<div className="w-full">
						<div className="flex flex-column sm:flex-row w-full items-center space-x-16 mt-16">
							<Controller
								name="start"
								control={control}
								render={({ field: { value } }) => (
									<div className="flex flex-col">
										<span className="font-bold">Fecha Inicio</span>
										<span>{formatDate(value)}</span>
									</div>
								)}
							/>

							<Controller
								name="end"
								control={control}
								render={({ field: { value } }) => (
									<div className="flex flex-col">
										<span className="font-bold">Fecha Fin</span>
										<span>{formatDate(value)}</span>
									</div>
								)}
							/>
						</div>

						<Controller
							name="allDay"
							control={control}
							render={({ field: { onChange, value } }) => (
								<FormControlLabel
									className="mt-8"
									disabled
									label="All Day"
									contentEditable={false}
									control={
										<Switch
											onChange={(ev) => {
												onChange(ev.target.checked);
											}}
											checked={value}
											name="allDay"
										/>
									}
								/>
							)}
						/>
					</div>
				</div>

				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex mt-16"
						color="action"
					>
						heroicons-outline:tag
					</FuseSvgIcon>

					<Controller
						name="extendedProps.label"
						control={control}
						render={({ field }) => (
							<EventLabelSelect
								className="mt-8 mb-16"
								{...(field as unknown as EventLabelSelectProps)}
							/>
						)}
					/>
				</div>

				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex mt-16"
						color="action"
					>
						heroicons-outline:menu-alt-2
					</FuseSvgIcon>

					<Controller
						name="extendedProps.desc"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								id="desc"
								label="Description"
								type="text"
								multiline
								rows={5}
								variant="outlined"
								fullWidth
								disabled
							/>
						)}
					/>
				</div>

				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex mt-16"
						color="action"
					>
						heroicons-outline:link
					</FuseSvgIcon>

					<Controller
						name="extendedProps.component"
						control={control}
						render={({ field }) => (
							<Button
								className="mt-8"
								variant="contained"
								color="primary"
								onClick={() => window.open(field.value.route)}
							>
								<FuseSvgIcon className="pr-6">heroicons-outline:eye</FuseSvgIcon> Más detalles
							</Button>
						)}
					/>
				</div>

				{/* {eventDialog.type === 'new' ? (
					<div className="flex items-center space-x-8">
						<div className="flex flex-1" />
						<Button
							variant="contained"
							color="primary"
							onClick={onSubmit}
							disabled={_.isEmpty(dirtyFields) || !isValid}
						>
							Add
						</Button>
					</div>
				) : (
					<div className="flex items-center space-x-8">
						<div className="flex flex-1" />
						<IconButton
							onClick={handleRemove}
							size="large"
						>
							<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
						</IconButton>
						<Button
							variant="contained"
							color="primary"
							onClick={onSubmit}
							disabled={_.isEmpty(dirtyFields) || !isValid}
						>
							Save
						</Button>
					</div>
				)} */}
			</div>
		</Popover>
	);
}

export default EventDialog;
