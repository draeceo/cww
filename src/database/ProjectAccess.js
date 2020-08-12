import firebase from './Firebase';
import 'firebase/database';
import 'firebase/storage';

const db = firebase.database();
const str = firebase.storage();

const projectsDbRef = db.ref('/projects');
const projectsStrRef = str.ref('/projects');

/**
 * Creates or updates a project with the given content.
 * @param {boolean} isCreating - is the project being updated or created.
 * @param {string} key - if updating, the key of the project to update.
 * @param {File} mainImg - the mainImg File object.
 * @param {FileList} gallery - a FileList containing all gallery File objects.
 * @param {string} title - the project title.
 * @param {string} description - the project description.
 * @param {string} date - the project date.
 */
export const putProject = async (isCreating, key, mainImg, gallery, title, description, date) => {
  const mainImgFileName = mainImg.name;
  const galleryFileNames = Object.values(gallery).map((file) => [file.name, file]);
  const projectData = {
    title,
    description,
    date,
    mainImg: mainImgFileName,
    gallery: galleryFileNames.map(([fileName]) => fileName)
  };

  const projectKey = isCreating ? (await projectsDbRef.push(projectData)).key : key;
  const projectStrRef = projectsStrRef.child(projectKey);

  const imgUploadCalls = galleryFileNames.map(([fileName, file]) => projectStrRef.child(fileName).put(file));
  imgUploadCalls.push(projectStrRef.child(mainImgFileName).put(mainImg));

  return Promise.all(imgUploadCalls);
}

/**
 * Retrieves a project and returns an object containing the project key and data.
 * @param {string} projectKey - the key of the project to retrieve.
 */
export const getProject = async (projectKey) => {
  const projectStrRef = projectsStrRef.child(projectKey)
  const projectData = await projectsDbRef.child(projectKey).once('value').val();
  
  const galleryImgDownloadCalls = projectData.gallery.map((fileName) => projectStrRef.child(fileName).getDownloadURL());
  const mainImgURL = await projectStrRef.child(projectData.mainImg).getDownloadURL();
  const galleryImgURLs = await Promise.all(galleryImgDownloadCalls);
  projectData.mainImg = mainImgURL;
  projectData.gallery = galleryImgURLs;
  
  return { key: projectKey, data: projectData };
}

/**
 * Retrieves all projects and returns an array of project objects.
 */
export const getAllProjects = async () => {
  const projectsSnap = await projectsDbRef.once('value');
  const projectDownloadCalls = [];
  projectsSnap.forEach(({ projectKey }) => projectDownloadCalls.push(getProject(projectKey)));
  return Promise.all(projectDownloadCalls);
}

/**
 * Deletes the given project.
 * @param {string} projectKey - the key of the project to delete. 
 */
export const deleteProject = async (projectKey) => {
  const projectRef = projectsDbRef.child(projectKey);
  const projectStrRef = projectStrRef.child(projectKey);
  await projectRef.remove();
  return projectsStrRef.delete();
}