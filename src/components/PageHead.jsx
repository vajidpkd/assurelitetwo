import PropTypes from "prop-types";

function PageHead({master,head}) {
  return (
    <div className="row">
    <div className="col-12">
      <div className="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 className="mb-sm-0 font-size-18">{head}</h4>

        <div className="page-title-right">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item">
              <a>{master}</a>
            </li>
            <li className="breadcrumb-item active">{head}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  )
}

PageHead.propTypes = {
    master: PropTypes.string,
    head: PropTypes.string
  };

export default PageHead