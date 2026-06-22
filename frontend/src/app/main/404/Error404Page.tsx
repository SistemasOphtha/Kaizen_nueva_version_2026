import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
/**
 * The Error404Page component renders a custom 404 error page.
 */
function Error404Page() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center p-16">
			<div className="w-full max-w-3xl text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
				>
					<img
						className="text-center w-full"
						src="assets/images/pages/404/404.svg"
						alt="404"
					/>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
				>
					<Typography
						variant="h1"
						className="mt-48 text-center text-4xl font-extrabold leading-tight tracking-tight sm:mt-96 md:text-7xl md:leading-none"
					/>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
				>
					<Typography
						variant="h5"
						color="text.secondary"
						className="text-center text-lg font-medium tracking-tight md:text-xl"
					>
						No se pudo encontrar la página que solicitó.
					</Typography>
				</motion.div>
				<Link
					className="mt-48 block font-normal"
					to="/"
				/>
			</div>
		</div>
	);
}

export default Error404Page;
