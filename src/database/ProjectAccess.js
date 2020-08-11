import firebase from './Firebase';
import 'firebase/database';
import 'firebase/storage';

const db = firebase.database();
const str = firebase.storage();

const projectsDbRef = db.ref('/projects');
const projectsStrRef = str.ref('/projects');

export const putProject = async (isCreating, key, mainImg, gallery, title, description) => {
  const mainImgFileName = mainImg.name;
  const galleryFileNames = gallery.map((file) => [file.name, file]);
  const projectData = {
    title,
    description,
    mainImg: mainImgFileName,
    gallery: galleryFileNames.map(([fileName]) => fileName)
  };

  const projectKey = isCreating ? await projectsDbRef.push(projectData) : key;
  const projectStrRef = projectsStrRef.child(projectKey);

  const imgUploadCalls = galleryFileNames.map(([fileName, file]) => projectStrRef.child(fileName).put(file));
  imgUploadCalls.push(projectStrRef.child(mainImgFileName).put(mainImg));

  return Promise.all(imgUploadCalls);
}

export const getProject = async (projectKey) => {
  const projectStrRef = projectsStrRef.child(projectKey)
  const projectData = await projectsDbRef.child(projectKey).once('value').val();
  
  const galleryImgDownloadCalls = projectData.gallery.map((fileName) => projectStrRef.child(fileName).getDownloadURL());
  const mainImgURL = await projectStrRef.child(projectData.mainImg).getDownloadURL();
  const galleryImgURLs = await Promise.all(galleryImgDownloadCalls);
  projectData.mainImg = mainImgURL;
  projectData.gallery = galleryImgURLs;
  
  return { [projectKey]: projectData };
}

export const getAllProjects = async () => {
  const projectsSnap = await projectsDbRef.once('value');
  const projectDownloadCalls = [];
  projectsSnap.forEach(({ projectKey }) => projectDownloadCalls.push(getProject(projectKey)));
  return Promise.all(projectDownloadCalls);
}

export const deleteProject = async (projectKey) => {
  const projectRef = projectsDbRef.child(projectKey);
  const projectStrRef = projectStrRef.child(projectKey);
  await projectRef.remove();
  return projectsStrRef.delete();
}