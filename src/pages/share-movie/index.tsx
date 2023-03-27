import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import MovieItem from "components/MovieItem";
import Button from "components/ui/Button";
import FieldInput from "components/ui/FieldInput";
import { Form, Formik, FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useCreateSharedMovieMutation } from "redux/services/coreApi";
import youtubeApi from "redux/services/youtubeApi";
import { logout } from "redux/slices/authSlice";
import useMovieHelper from "hooks/useMovieHelper";
import { MovieSubmitData, YoutubeMovieResponse } from "types/Common";

const ShareMovie = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const [createSharedMovie, { isLoading: isSubmitting }] = useCreateSharedMovieMutation();
  const { getVideoIdFromUrl, truncateText } = useMovieHelper();

  const [movieInfo, setMovieInfo] = useState<MovieSubmitData | null>(null);

  const initialValues = {
    url: "",
  };

  const validateForm = async ({ url }: { url: string }) => {
    const errors: Record<string, string> = {};

    if (!url?.length) {
      errors.url = "Required";

      return errors;
    }

    const movieId = getVideoIdFromUrl(url);

    if (!movieId) {
      errors.url = "Invalid youtube url";
      setMovieInfo(null);

      return errors;
    }

    if (movieId) {
      await youtubeApi
        .get<YoutubeMovieResponse>("/videos", { params: { id: movieId } })
        .then((response) => {
          if (!response?.data) {
            return;
          }

          const movie = response.data.items[0];

          setMovieInfo({
            title: movie.snippet.title,
            description: movie.snippet.description,
            embedId: movie.id,
            email: currentUser?.email ?? "",
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }

    return errors;
  };

  const handleSubmitForm = (
    formData: { url: string },
    { resetForm }: FormikHelpers<{ url: string }>,
  ) => {
    if (!movieInfo) {
      return;
    }

    const { title, description, embedId, email } = movieInfo;
    createSharedMovie({ title, description: truncateText(100, description), embedId, email })
      .unwrap()
      .then(() => {
        toast.success("Movie shared successfully");
        resetForm();
      })
      .catch((error) => {
        const errorMessage = error.data ?? error.message;

        toast.error(errorMessage);

        if (errorMessage === "jwt expired") {
          dispatch(logout());

          navigate("/");
        }
      });
  };

  const handleBackToList = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <div className="hero min-h-screen py-7 items-start">
        <div className="flex-col md:flex-row hero-content flex-wrap gap-y-6">
          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validate={validateForm}
            onSubmit={handleSubmitForm}
            onReset={() => setMovieInfo(null)}
            enableReinitialize
          >
            {() => (
              <Form className="sm:w-[400px] md:w-[600px] max-w-full">
                <fieldset className="border border-neutral-content px-7 py-5 md:px-14 md:py-10">
                  <legend>Share a Youtube movie</legend>

                  {movieInfo && (
                    <MovieItem
                      title={movieInfo.title}
                      embedId={movieInfo.embedId}
                      description={truncateText(100, movieInfo.description)}
                      className="mb-8"
                    />
                  )}

                  <FieldInput
                    label="Youtube URL"
                    inputType="text"
                    entityType="url"
                    bordered
                    placeholder="paste your video link here"
                    inputClasses="max-w-full"
                    className="grid grid-cols-3 items-center"
                    wrapperClasses="col-start-2 col-end-4"
                  />
                  <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-4 mt-6 col-start-2 col-end-4">
                      <Button
                        loading={isSubmitting}
                        type="submit"
                        outlined
                        color="success"
                        lowerCased
                      >
                        share
                      </Button>
                      <Button outlined color="info" lowerCased onClick={handleBackToList}>
                        back to list
                      </Button>
                    </div>
                  </div>
                </fieldset>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ShareMovie;
