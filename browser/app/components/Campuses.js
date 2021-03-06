import React from 'react';
import { Link } from 'react-router-dom';

const Campuses = (props) => {
	const campuses = props.campuses
	return (
		<div>
			<h1>CAMPUSES</h1>
			{campuses.map((campus) => {
				return (
					<h1 key={campus.id} className="col-xs-4">
						<Link to={`/campuses/${campus.id}`}>
							<img src={campus.imgUrl} className='campusImg'/>
							{campus.name}
						</Link>
					</h1>
					);
				}
			)}
		</div>
		);
};
export default Campuses;