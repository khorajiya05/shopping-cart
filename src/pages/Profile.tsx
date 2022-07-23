import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { auth } from "../firebase";

function Profile() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 d-flex justify-content-center border p-5">
            <div className="well well-sm">
              <div className="row">
                <div className="col-sm-6 col-md-4">
                  <img
                    src={user?.photo}
                    alt="img not found"
                    className="img-rounded img-responsive"
                  />
    
                </div>
                <div className="col-sm-6 col-md-8">
                  <h4>
                    {user?.displayName
                      ? user?.displayName
                      : String(user?.email).split("@")[0]}
                  </h4>
                  <small>
                    <cite title="San Francisco, USA">
                      San Francisco, USA{" "}
                      <i className="glyphicon glyphicon-map-marker"></i>
                    </cite>
                  </small>
                  <p>
                    <i className="glyphicon glyphicon-envelope" />
                    {user?.email}
                    <br />
                    <i className="glyphicon glyphicon-globe" />
                    <NavLink to="http://www.jquery2dotnet.com">
                      www.jquery2dotnet.com
                    </NavLink>
                    <br />
                    <i className="glyphicon glyphicon-gift" />
                    June 02, 1988
                  </p>
                  {/* Split button */}
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => {
                        auth.signOut();
                        navigate(-1);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
